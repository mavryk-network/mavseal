FROM golang:1.14-alpine AS build-env

ENV COLLECTOR_PKG="github.com/mavryk-network/mavseal/pkg/metrics"
ENV GO111MODULE="on"
WORKDIR /build/mavseal
RUN apk update && apk add git openssh bash
ADD . .
RUN go build -ldflags "-X ${COLLECTOR_PKG}.GitRevision=${GIT_REVISION} -X ${COLLECTOR_PKG}.GitBranch=${GIT_BRANCH} -X ${COLLECTOR_PKG}.GitVersion=${GIT_VERSION}" ./cmd/mavseal
RUN go build -ldflags "-X ${COLLECTOR_PKG}.GitRevision=${GIT_REVISION} -X ${COLLECTOR_PKG}.GitBranch=${GIT_BRANCH} -X ${COLLECTOR_PKG}.GitVersion=${GIT_VERSION}" ./cmd/mavseal-cli


# final stage
FROM alpine:3
RUN apk --no-cache add ca-certificates
COPY --from=build-env /build/mavseal/mavseal /bin
COPY --from=build-env /build/mavseal/mavseal-cli /bin

ENTRYPOINT ["/bin/mavseal"]
