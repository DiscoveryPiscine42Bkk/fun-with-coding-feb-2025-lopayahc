#!/bin/bash

# Check if no arguments are provided
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

# Loop through all provided arguments
for arg in "$@"; do
    mkdir -p "ex$arg"  # Create directory with 'ex' prefix
done
