#!/bin/bash
brew install npm
npm install
npm run build
npm run serve
vite preview --open
