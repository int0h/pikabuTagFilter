// ==UserScript==
// @name         tagFilter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Фильтрация тегов с логическими выражениями
// @author       int0h
// @match        pikabu.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let filterFunc;

    function init() {
        let expression = localStorage.tagFilter_expression;
        if (expression) {
            expression = prompt('Введите выражение для фильтрации тегов в виде: tags.кот && tags["с пробелом"]');
            expression = localStorage.tagFilter_expression;
        }
        filterFunc = genFilter(expression);
    }

    function genFilter(expString) {
        return new Function('tags', 'return ' + expString);
    }

    init();

    function main() {
        const storiesToHide = $('.story').filter((id, story) => {
            const tagList = $(story)
                .find('.story__tag')
                .toArray()
                .map(item => item.textContent.trim());
            let tagHash = {};
            tagList.forEach(tag => tags[tag] = true);
            return filterFunc(tagHash);
        });
        storiesToHide.hide();
    }

    main();
})();