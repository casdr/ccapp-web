<table class="table">
  {{#.}}
    <tr {{#break}}class="tr-break"{{/break}}{{#test}}class="tr-test"{{/test}}><td>{{start}} - {{end}}</td><td>{{class}}</td><td>{{room}}</td><td>{{groups}}</td></tr>
  {{/.}}
</table>