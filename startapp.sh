#!/bin/bash

sed 's/127.0.0.1/host.docker.internal/g' ./src/navigation/Main.js

yarn run start
