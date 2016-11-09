#!/bin/sh

if hash yarn; then
  echo "Using yarn for running scripts"
  PACKAGE_MANAGER=yarn
  INSTALL_DEP=yarn
elif hash npm; then
  echo "Using npm for running scripts"
  PACKAGE_MANAGER=npm
  INSTALL_DEP=npm install
else
  echo "Neither npm nor yarn was found. Exiting."
  exit 1
fi

if hash docker; then
  echo "Docker found"
else
  echo "Docker not found. Exiting."
  exit 2
fi

echo "*** Installing dependencies"
$INSTALL_DEP
if [ ! $? ]; then
  echo "!!! Installing dependencies failed."
  exit 3
fi

echo "*** Running tests"
$PACKAGE_MANAGER test
if [ ! $? ]; then
  echo "!!! Test failed."
  exit 3
fi

echo "*** Building"
$PACKAGE_MANAGER run build
if [ ! $? ]; then
  echo "!!! Building failed."
  exit 3
fi

echo "*** Copying build artifact"
cp -r dist/ docker/


if [ -z $1 ]; then
  IMAGE_NAME=snucse-nginx
  echo "Using default image name $IMAGE_NAME"
else
  IMAGE_NAME=$1
  echo "Using image name $IMAGE_NAME"
fi

echo "*** Building image $IMAGE_NAME"
docker build -t "$IMAGE_NAME" docker/
if [ ! $? ]; then
  echo "!!! Building image failed"
  exit 4
fi
