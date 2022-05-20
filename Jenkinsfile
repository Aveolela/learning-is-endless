pipeline {
  agent any
  parameters { 
    booleanParam(name: 'isDebug', defaultValue: false, description: '是否开启debug模式')
    string(name: 'email', defaultValue: 'xxx@qq.com', description: '邮箱地址')
    choice(name: 'custom', choices: ['inland', 'oversea', 'dingding', 'cvtouch'], description: '配置化')
  }
  stages {
    stage('build') {
      steps {
        echo 'build'
      }
    }
    stage('publish') {
      steps {
        echo 'publish'
      }
    }
  }
}