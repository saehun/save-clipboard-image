#!/bin/bash

echo "$(echo '#!/usr/bin/env node' | cat - dist/bin.js)" > dist/bin.js
chmod +x dist/bin.js
