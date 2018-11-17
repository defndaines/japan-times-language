# Japan Times Language

**Work in Progress** 

This is a browser extension for removing hiragana hints from the [Japan Times
Language articles](https://www.japantimes.co.jp/life_category/language/).

Right now, the script is hard-coded to Jōyō [常用] kanji levels, since that
was the easiest data for me to grab and test against.

## Background

I find the language articles at the _Japan Times_ website to be useful, but
since I already know quite a bit of kanji, I find the hiragana hints
distracting when they are for kanji I already know. Furthermore, having the
hint undermines a change to test my learning, i.e., that I *DO* know how to
read the kanji without the hint, since I cannot unsee the hint.

## Goals

My goal is to have this browser extension by dynamic, potentially even sharing
it with others if they find it useful. This will mean allowing the user to set
their kanji reading level. I may also try to tie it into
[WaniKani](https://www.wanikani.com/) levels, so that it queries a user's API
key then eliminates kanji based upon kanji learned up through the user's
current level.
