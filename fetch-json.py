#!/usr/bin/env python3

import sys
from urllib.request import urlopen
import json
import pprint


def fetch(url):
    response = urlopen(url)
    data = json.loads(response.read())
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(data)
    return data


def saveToFile(data, fileName):
    with open(fileName, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def main(args=None):
    args = sys.argv[1:]
    print("args:", args[0])
    print("args:", args[1])

    data = fetch(args[0])
    saveToFile(data, args[1])


if __name__ == "__main__":
    print("args count: {}".format(len(sys.argv)))

    if (len(sys.argv) == 3):
        main()
