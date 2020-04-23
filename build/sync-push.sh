#!/usr/bin/env bash

set -e

rm -rf sync

main() {
  git log -1 --pretty=%B | cat |
  if read -r MESSAGE
  then
    echo "last commit message:"
    echo "$MESSAGE"

    local CREATED=1

    {
      git clone https://user:${GH_TOKEN}@github.com/faizahmedfarooqui/ycombinator-react.git sync -b development
    } || {
      echo "branch \`development\` has not been created"
      CREATED=0
      mkdir sync
      cd sync
      git init
      git checkout -b development
      git remote add origin https://user:${GH_TOKEN}@github.com/faizahmedfarooqui/ycombinator-react.git
      cd ..
    }

    rm -rf sync/*

    cd sync
    cp -rf ../dist/* .
    cp ../*.md .

    git add -A
    git status -s |
    if read
    then
      git commit -m "$MESSAGE"

      if [ "$CREATED" == "1" ]
      then
        git push --quiet
      else
        echo "first push, create \`development\` branch"
        git push --quiet --set-upstream origin development
      fi
    else
      echo "there is nothing changed to commit"
    fi

    rm -rf sync
  fi
}

main
