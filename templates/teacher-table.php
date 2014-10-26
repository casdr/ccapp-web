<h3>{{name}}</h3>
<table class="table">
  {{#lessons}}
    {{^break}}
      <tr><td>{{start}} - {{end}}</td><td>{{lesson}}</td><td>{{room}}</td><td>{{class}}</td></tr>
    {{/break}}
    {{#break}}
      <tr class="success"><td>{{start}} - {{end}}</td><td>{{lesson}}</td><td>{{room}}</td><td>{{class}}</td></tr>
    {{/break}}
  {{/lessons}}
</table>