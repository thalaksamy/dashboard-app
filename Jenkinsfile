pipeline {
  agent any

  environment {
    NODE_ENV = "production"
  }

  stages {
    stage("Checkout") {
      steps {
        checkout scm
      }
    }

    stage("Install") {
      steps {
        sh "npm install"
        sh "npm run install:all"
      }
    }

    stage("Build Client") {
      steps {
        sh "npm run build"
      }
    }

    stage("Archive Build") {
      steps {
        archiveArtifacts artifacts: "client/dist/**", fingerprint: true
      }
    }

    stage("Deploy") {
      steps {
        sh """
          echo 'Deploy step placeholder'
          # Example:
          # scp -r client/dist user@server:/var/www/dashboard-app/client/dist
          # ssh user@server \"pm2 restart dashboard-app || pm2 start server/index.js --name dashboard-app\"
        """
      }
    }
  }

  post {
    success {
      echo "Deployment complete."
    }
    failure {
      echo "Build or deploy failed."
    }
  }
}
