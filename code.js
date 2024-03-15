function onFormSubmit(e) {
    // フォームからのユーザー入力を取得する
    const userInput = GetUserInput(e);
    
    // OpenAI APIを使用してプロジェクトテンプレートを生成する(csv)
    const projectTemplate = GenerateProjectTemplate(userInput);
    
    // プロジェクトテンプレート(csv)からJootoにプロジェクト、リスト、タスクを作成する
    CreateJootoProject(projectTemplate);
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
   * @return {array} プロジェクトテンプレートのCSVデータを表す２次元配列
   */
  function GenerateTemplate(userInput) {
    // ファインチューニングしたOpenAI APIにユーザー入力を送信
    // csv形式のプロジェクトテンプレートを生成
    // 生成されたプロジェクトテンプレートを返す
  }
  
  /**
   * プロジェクトテンプレートからJootoにプロジェクト、リスト、タスクを作成する関数
   * @param {array} projectTemplate プロジェクトテンプレートのCSVデータを表す２次元配列
   */
  function CreateJootoProject(projectTemplate) {
    // プロジェクトテンプレートからプロジェクト情報を抽出し、Jooto APIを使用してプロジェクトを作成
    // プロジェクトテンプレートからリスト情報を抽出し、Jooto APIを使用してリストを作成
    // プロジェクトテンプレートからタスク情報を抽出し、Jooto APIを使用してタスクを作成
  }
  
  /**
   * Jooto APIを使用してプロジェクトを作成する関数
   * @param {object} projectData プロジェクト情報を含むオブジェクト
   * @return {string} projectId 作成されたプロジェクトのID
   */
  function CreateProjectViaAPI(projectData) {
    // Jooto APIのエンドポイント（POST /v1/boards）に、projectDataをペイロードとしてPOSTリクエストを送信
    // 作成されたプロジェクトのIDを返す
  }
  
  /**
   * Jooto APIを使用してリストを作成する関数
   * @param {string} projectId プロジェクトID
   * @param {object} listData リスト情報を含むオブジェクト
   * @return {string} 作成されたリストのID
   */
  function CreateListViaAPI(projectId, listData) {
    // Jooto APIのエンドポイント（POST /v1/boards/{id}/lists）に、listDataをペイロードとしてPOSTリクエストを送信
    // 作成されたリストのIDを返す
  }
  
  /**
   * Jooto APIを使用してタスクを作成する関数
   * @param {string} projectId プロジェクトID
   * @param {object} taskData タスク情報を含むオブジェクト
   * @return {string} 作成されたタスクのID
   */
  function CreateTaskViaAPI(projectId, taskData) {
    // Jooto APIのエンドポイント（POST /v1/boards/{id}/tasks）に、taskDataをペイロードとしてPOSTリクエストを送信
    // 作成されたタスクのIDを返す
  }