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
    stage('打印信息') {
      steps {
        echo 'env.JOB_NAME: ${env.JOB_NAME}'
        echo 'env.isDebug: ${env.isDebug}'
        echo 'env.email: ${env.email}'
        echo 'env.custom: "${env.custom}"'
        echo 'env.WORKSPACE:' env.WORKSPACE
        echo 'env.JENKINS_URL:' env.JENKINS_URL
        echo 'env.BUILD_URL:' env.BUILD_URL
        echo 'env.NODE_NAME:' env.NODE_NAME
      }
    }
  }
}