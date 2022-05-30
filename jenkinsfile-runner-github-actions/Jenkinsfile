#!groovy
import groovy.json.JsonOutput

node {
    // pull request or feature branch
    if  (env.GITHUB_REF != 'refs/heads/master') {
        checkoutSource()
        build()
        unitTest()
    } // master branch / production
    else {
        checkoutSource()
        build()
        allTests()
        createRelease("${env.GITHUB_ACTION}-${env.GITHUB_SHA}")
    }
}

def createRelease(name) {
  stage ('createRelease') {
        def payload = JsonOutput.toJson(["tag_name": "v-${name}", "name": "GitHub Action triggered release: ${name}", "body": "This release has been created with the help of a Jenkins single-shot master running inside of a GitHub Action. For more details visit https://github.com/jonico/jenkinsfile-runner-github-actions"])
        def apiUrl = "https://api.github.com/repos/${env.GITHUB_REPOSITORY}/releases"
        mysh("curl -s --output /dev/null -H \"Authorization: Token ${env.GITHUB_TOKEN}\" -H \"Accept: application/json\" -H \"Content-type: application/json\" -X POST -d '${payload}' ${apiUrl}")
    }
}

// prevent output of secrets and a globbing patterns by Jenkins
def mysh(cmd) {
    sh('#!/bin/sh -e\n' + cmd)
}

def checkoutSource() {
  stage ('checkoutSource') {
    // as the commit that triggered that Jenkins action is already mapped to /github/workspace, we just copy that to the workspace
    copyFilesToWorkSpace()
  }
}

def copyFilesToWorkSpace() {
  mysh "cp -r /github/workspace/* $WORKSPACE"
}

def build () {
    stage ('Build') {
      mvn 'clean install -DskipTests=true -Dmaven.javadoc.skip=true -Dcheckstyle.skip=true -B -V'
    }
}


def unitTest() {
    stage ('Unit tests') {
      mvn 'test -B -Dmaven.javadoc.skip=true -Dcheckstyle.skip=true'
    }
}

def allTests() {
    stage ('All tests') {
      // don't skip anything
      mvn 'test -B'
    }
}

def mvn(args) {
    sh "mvn ${args} -Dmaven.repo.local=/github/workspace/.m2"
}
