pipeline {
  agent any

  stages {

    stage('Create Network') {
      steps {
        sh 'docker network create app-net || true'
      }
    }

    stage('Build Images') {
      steps {
        sh '''
        docker build -t frontend-app ./frontend
        docker build -t backend-app ./backend
        '''
      }
    }

    stage('Start Database') {
      steps {
        sh '''
        docker rm -f mysql-db || true
        docker run -d --name mysql-db \
        --network app-net \
        -e MYSQL_ROOT_PASSWORD=root \
        -v $(pwd)/db:/docker-entrypoint-initdb.d \
        mysql:5.7
        '''
      }
    }

    stage('Deploy Backend') {
      steps {
        sh '''
        docker rm -f backend || true
        docker run -d --name backend \
        --network app-net \
        -p 3000:3000 backend-app
        '''
      }
    }

    stage('Deploy Frontend') {
      steps {
        sh '''
        docker rm -f frontend || true
        docker run -d --name frontend \
        --network app-net \
        -p 8080:80 frontend-app
        '''
      }
    }
  }
}
