FROM golang:1.24-bullseye AS builder
RUN apt-get update && apt-get install -y make
ADD . /mavseal
WORKDIR /mavseal
RUN make

FROM debian:bullseye-slim
WORKDIR /mavseal
RUN apt update -y \
    && apt install -y curl apt-transport-https\
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /mavseal/mavseal.yaml /mavseal/mavseal.yaml
COPY --from=builder /mavseal/mavseal /usr/bin/mavseal
COPY --from=builder /mavseal/mavseal-cli /usr/bin/mavseal-cli

ENTRYPOINT ["/usr/bin/mavseal"]
CMD [ "-c", "/mavseal/mavseal.yaml" ]
