const API_KEY = "f53e4546b0042f0aae00fc795d59f01e"; // JootoのAPIキーを設定

function onFormSubmit(e) {
  // フォームからのユーザー入力を取得する
  const userInput = GetUserInput(e);
  
  // OpenAI APIを使用してプロジェクトテンプレートを生成する(csv)
  const projectTemplate = GenerateProjectTemplate(userInput);
  
  // プロジェクトテンプレート(csv)からJootoにプロジェクト、リスト、タスクを作成する
  CreateJootoProject(projectTemplate, userInput.projectName, userInput.projectOverview);
}

/**
 * ユーザー入力を取得する関数
 * @param {object} e フォーム送信イベントオブジェクト
 * @return {object} プロジェクト名とプロジェクト概要を含むオブジェクト
 */
function GetUserInput(e) {
  // フォームの回答を取得
  const formResponse = e.response;
  
  // 回答からプロジェクト名とプロジェクト概要を抽出
  const itemResponses = formResponse.getItemResponses();
  const projectName = itemResponses[0].getResponse();
  const projectOverview = itemResponses[1].getResponse();
  
  // 抽出した情報をオブジェクトとして返す
  return {projectName: projectName, projectOverview: projectOverview};
}

/**
 * OpenAI APIを使用してプロジェクトテンプレートを生成する関数
 * @param {object} userInput ユーザー入力オブジェクト
 * @return {string} プロジェクトテンプレートのCSV文字列
 */
function GenerateProjectTemplate(userInput) {
  // ファインチューニングしたOpenAI APIにユーザー入力を送信
  // csv形式のプロジェクトテンプレートを生成
  // 生成されたプロジェクトテンプレートを返す
}

/**
 * プロジェクトテンプレートからJootoにプロジェクト、リスト、タスクを作成する関数
 * @param {string} csvString プロジェクトテンプレートのCSV文字列
 * @param {string} projectName プロジェクト名
 * @param {string} projectOverview プロジェクトの概要
 */
function CreateJootoProject(csvString, projectName, projectOverview) {
  // Jooto APIを使用してプロジェクトを作成
  const projectId = addProject(API_KEY, projectName, {description: projectOverview}).data.id;
  
  // CSVをパースしてリストとタスクを作成
  const rows = Utilities.parseCsv(csvString);
  const lists = {};
  
  for (let i = 1; i < rows.length; i++) {
    const [listName, taskName, description, status, label, assignee, startDate, startTime, dueDate, dueTime, plan, actual, checklistName, itemName, itemCompleted, itemAssignee, itemStartDate, itemStartTime, itemDueDate, itemDueTime] = rows[i];
    
    // リストが存在しない場合は作成
    if (!lists[listName]) {
      const listId = addList(API_KEY, listName, projectId, "#000000").data.id;
      lists[listName] = listId;
    }
    
    // タスクを作成
    const listId = lists[listName];
    const additionalData = {
      description: description,
      assigned_user_ids: [assignee],
      start_date_time: startDate + " " + startTime,
      deadline_date_time: dueDate + " " + dueTime
    };
    const taskId = addTask(API_KEY, projectId, listId, taskName, additionalData).data.id;
    
    // チェックリストとアイテムを作成
    if (checklistName) {
      const checklistId = createJootoCheckList_(API_KEY, taskId, checklistName).data.id;
      if (itemName) {
        const additionalData = {
          assigned_user_ids: [itemAssignee],
          start_date_time: itemStartDate + " " + itemStartTime,
          deadline_date_time: itemDueDate + " " + itemDueTime
        };
        addItem(API_KEY, checklistId, itemName, additionalData);
      }
    }
  }
}

function main() {
    const csvString = `リスト名*,タスク名*,説明,ステータス*,ラベル,タスク担当者,タスク開始日,タスク開始時間,タスク締切日,タスク締切時間,予定,実績,チェックリスト名,アイテム名,アイテム完了フラグ,アイテム担当者,アイテム開始日,アイテム開始時間,アイテム締切日,アイテム締切時間
  共有事項,中期経営目標,,未完了,"","",,,,,,,,,,,,,,
  共有事項,発注ルール,,未完了,"","",,,,,,,,,,,,,,
  共有事項,よく使うファイル保管場所,,未完了,"","",,,,,,,,,,,,,,
  ToDo,株主総会の準備,,未完了,"","",,,,,,,,,,,,,,
  ToDo,オフィス環境・冷房機器の点検整備,,未完了,"","",,,,,,,,,,,,,,
  ToDo,年賀状の返礼,,未完了,"","",,,,,,,,,,,,,,
  ToDo,入社式の準備,,未完了,"","",,,,,,,,,,,,,,
  ToDo,名刺発注,,未完了,月次タスク,"",,,,,,,,,,,,,,
  ToDo,消耗品発注,,未完了,"","",,,,,,,,,,,,,,
  総務進行中,オフィスに置くお菓子の発注先を増やす,,未完了,月次タスク,"",,,,,,,,,,,,,,
  総務進行中,リーガルチェックの依頼フロー整備,,未完了,"","",,,,,,,,,,,,,,
  総務進行中,秘密保持契約書のひな形見直し,,未完了,優先度:高,"",,,,,,,,,,,,,,
  総務進行中,防災グッズの購入,,未完了,"","",,,,,,,,,,,,,,
  総務進行中,シュレッダーの修理,,未完了,"","",,,,,,,,,,,,,,
  総務進行中,忘年会の準備進行,,未完了,"","",,,,,,,,,,,,,,
  確認中,利用規約の英語版作成,,未完了,"","",,,,,,,,,,,,,,
  確認中,社会保険料の納付,,未完了,"","",,,,,,,,,,,,,,
  確認中,防災訓練の実施,,未完了,"","",,,,,,,,,,,,,,
  確認中,年賀状の準備・発送,,未完了,優先度:高、相談,"",,,,,,,,,,,,,,
  確認中,自販機の故障連絡,,未完了,"","",,,,,,,,,,,,,,
  完了,決算発表会準備のフロー整備,,未完了,"","",,,,,,,,,,,,,,
  完了,冷房設備の整備・点検,,未完了,優先度:高,"",,,,,,,,,,,,,,
  完了,暑中見舞いの発送,,未完了,優先度:高,"",,,,,,,,,,,,,,
  中長期タスク,新ツールの導入,,未完了,"","",,,,,,,,,,,,,,
  中長期タスク,カフェスペースの作成,,未完了,"","",,,,,,,TODO,企画書作成,0,"",,,,
  中長期タスク,カフェスペースの作成,,未完了,"","",,,,,,,TODO,社長ヒアリング,0,"",,,,
  中長期タスク,カフェスペースの作成,,未完了,"","",,,,,,,TODO,アンケート作成,0,"",,,,
  中長期タスク,文書管理,,未完了,年次タスク,"",,,,,,,,,,,,,,
  中長期タスク,契約書管理,,未完了,年次タスク,"",,,,,,,,,,,,,,
  中長期タスク,機器・備品管理,,未完了,年次タスク,"",,,,,,,,,,,,,,
  中長期タスク,郵便物の仕分け･確認,,未完了,年次タスク,"",,,,,,,,,,,,,,`;
  
    const projectName = "総務部プロジェクト";
    const projectOverview = "総務部の業務管理用プロジェクト";
    
    CreateJootoProject(csvString, projectName, projectOverview);
  }