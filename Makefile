GIT_REVISION := $(shell git rev-parse HEAD)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
CONTAINER_TAG ?= $(shell git branch --show-current)

COLLECTOR_PKG = github.com/mavryk-network/mavseal/pkg/metrics

PACKAGE_NAME          := github.com/mavryk-network/mavseal
GOLANG_CROSS_VERSION  ?= v1.24.0

all: mavseal mavseal-cli

# build is controlled by Go build system, so mark phony to ignore file timestamps
.PHONY: mavseal mavseal-cli
mavseal:
	CGO_ENABLED=1 go build -ldflags "-X $(COLLECTOR_PKG).GitRevision=$(GIT_REVISION) -X $(COLLECTOR_PKG).GitBranch=$(GIT_BRANCH)" ./cmd/mavseal
mavseal-cli:
	CGO_ENABLED=1 go build -ldflags "-X $(COLLECTOR_PKG).GitRevision=$(GIT_REVISION) -X $(COLLECTOR_PKG).GitBranch=$(GIT_BRANCH)" ./cmd/mavseal-cli

.PHONY: container
container: mavseal mavseal-cli
	docker build -t mavrykdynamics/mavseal:$(CONTAINER_TAG) -f goreleaser.dockerfile .

clean:
	rm mavseal mavseal-cli

.PHONY: release-dry-run
release-dry-run:
	sudo rm -rf ./dist
	docker run \
		--rm \
		--privileged \
		-e CGO_ENABLED=1 \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-v `pwd`:/go/src/$(PACKAGE_NAME) \
		-w /go/src/$(PACKAGE_NAME) \
		ghcr.io/goreleaser/goreleaser-cross:${GOLANG_CROSS_VERSION} \
		release \
		--clean \
		--snapshot \
		--skip=docker

.PHONY: release-preview
release-preview:
	docker run \
		--rm \
		--privileged \
		-e CGO_ENABLED=1 \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-v $(HOME)/.docker:/root/.docker \
		-v `pwd`:/go/src/$(PACKAGE_NAME) \
		-w /go/src/$(PACKAGE_NAME) \
		ghcr.io/goreleaser/goreleaser-cross:${GOLANG_CROSS_VERSION} \
		release \
		--clean \
		--snapshot

.PHONY: release
release:
	@if [ ! -f ".env" ]; then \
		echo ".env file is required for release";\
		exit 1;\
	fi
	docker run \
		--rm \
		--privileged \
		-e CGO_ENABLED=1 \
		--env-file .env \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-v $(HOME)/.docker:/root/.docker \
		-v `pwd`:/go/src/$(PACKAGE_NAME) \
		-w /go/src/$(PACKAGE_NAME) \
		ghcr.io/goreleaser/goreleaser-cross:${GOLANG_CROSS_VERSION} \
		release \
		--clean \
		--skip=validate
