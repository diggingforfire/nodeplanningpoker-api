'use strict';

define(['ko', 'jquery'], function(ko, $) {

    function FadeVisibleBinding() {
        var self = this;

        self.init = function(element, valueAccessor) {
            var value = valueAccessor();
            $(element).toggle(ko.unwrap(value));
        };

        self.update = function(element, valueAccessor) {
            var value = valueAccessor();
            ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
        };
    }

    return FadeVisibleBinding;
});