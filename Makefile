APP_NAME=onboarding-jparkkennaby-node
# CIRCLE_SHA1: The SHA1 hash of the last commit of the current build (default env var provided by circleci)
# https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables

install:
	npm install

test:
	npm run test

docker_login:
	docker login -u $(NAMESPACE) -p $(UW_DOCKER_PASS) $(REGISTRY)

docker_build:
	docker build -t $(REGISTRY)/$(NAMESPACE)/$(APP_NAME):$(CIRCLE_SHA1) .

docker_push:
	docker push $(REGISTRY)/$(NAMESPACE)/$(APP_NAME):$(CIRCLE_SHA1)

# deploy:
# 	curl -X PATCH -k -d '{"spec":{"template":{"spec":{"containers":[{"name":"'$(APP_NAME)'","image":"$(REGISTRY)/$(NAMESPACE)/$(APP_NAME):'$(CIRCLE_SHA1)'"}]}}}}' -H "Content-Type: application/strategic-merge-patch+json" -H "Authorization: Bearer $(K8S_DEV_TOKEN)" "https://elb.master.k8s.dev.uw.systems/apis/apps/v1/namespaces/$(NAMESPACE)/deployments/$(APP_NAME)"