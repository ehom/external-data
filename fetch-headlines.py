#!/usr/bin/env python3

import sys
import os

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


def fetchNews(base_url, countries, base_filename):
    print("base_url:", base_url)
    print("countries:", countries)
    print("base_filename:", base_filename)

    for code in countries.split(','):
        url = "{}&country={}".format(base_url, code)
        filename = "{}-{}".format(code, base_filename)

        print("url:", url)
        print("filename:", filename)

        data = fetch(url)
        saveToFile(data, filename)


def main(args):
    base_url, base_filename, countries = args

    try:
        fetchNews(base_url, countries, base_filename)
    except urllib.error.HTTPError as err:
        print(err.code)
    else:
        print('Fetched News headlines!')


if __name__ == "__main__":
    if (len(sys.argv) < 4):
        print("Usage: {0} URL output_filename countries".format(sys.argv[0]))
        os._exit(1)

    main(sys.argv[1:])
