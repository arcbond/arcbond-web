
const $  = require('jquery');



$("#showMailchimpModal").click(function() {
  $("#mailchimp-modal").addClass("is-active");
});

$(".modal-close").click(function() {
   $("#mailchimp-modal").removeClass("is-active");
});
