#!/bin/bash
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else    
# Display up to 3 arguments
    echo "Argument 1: $1"
    echo "Argument 2: $2"
    echo "Argument 3: $3"
fi