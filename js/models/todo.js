/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, $, FileError, brackets, window */
define(['underscore', 'backbone'], function (_, Backbone) {
    'use strict';
    var TodoModel = Backbone.Model.extend({

        // Default attributes for the todo.
        defaults: {
            content: "empty todo...",
            done: false
        },

        // Ensure that each todo created has `content`.
        initialize: function () {
            if (!this.get("content")) {
                this.set({
                    "content": this.defaults.content
                });
            }
        },

        // Toggle the `done` state of this todo item.
        toggle: function () {
            this.save({
                done: !this.get("done")
            });
        },

        // Remove this Todo from *localStorage*.
        clear: function () {
            this.destroy();
        }

    });
    return TodoModel;
});