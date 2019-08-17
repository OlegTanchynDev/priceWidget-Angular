#!/usr/bin/env groovy
@Library('pipelineTemplate') _

def exchangeDeploymentParam = new DeploymentParam()
exchangeDeploymentParam.kubernetesNamespace = "public"
exchangeDeploymentParam.kubernetesController = "deployments"

def deploymentParams = new ArrayList<>()
deploymentParams.add(exchangeDeploymentParam)

def stagesToSkip = new StagesToSkip()
stagesToSkip.uat = true
stagesToSkip.smokeTest = true
stagesToSkip.unitTest = true
stagesToSkip.intTestThenDeploy = true

pipelineTemplate("einstein-widgets", stagesToSkip, deploymentParams, "JDK 8")