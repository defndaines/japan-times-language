# Japan Times Language

**Work in Progress** 

This is a browser extension for removing hiragana hints from the [Japan Times
Language articles](https://www.japantimes.co.jp/life_category/language/).

Right now, the script is hard-coded to Jōyō [常用] kanji levels, since that
was the easiest data for me to grab and test against.

The script works by looking for a sequence of kanji followed by hiragana in
parentheses, e.g., "困(こま)る". It checks to see if _all_ of the kanji are
known kanji, and if so, removes the parenthetical hiragana. If one kanji is
known but another is not in a compound word, it will retain the hiragana hint.
Additionally, it is only removing pure-hiragana hints. This prevents removing
parenthetical statements which include meanings the article is purposefully
trying to convey, e.g., "伝える(to tell)" or "全員(ぜんいん, everyone, all
members)".

## Background

I find the language articles at the _Japan Times_ website to be useful, but
since I already know quite a bit of kanji, I find the hiragana hints
distracting when they are for kanji I already know. Furthermore, having the
hint undermines a chance to test my learning, i.e., that I *DO* know how to
read the kanji without the hint, since I cannot unsee the hint.

## Goals

My goal is to have this browser extension be dynamic, potentially even sharing
it with others if they find it useful. This will mean allowing the user to set
their kanji reading level. I may also try to tie it into
[WaniKani](https://www.wanikani.com/) levels, so that it queries a user's API
key then eliminates kanji based upon kanji learned up through the user's
current level.
