<h3>{{name}}</h3>
<table class="table">
  {{#lessons}}
    {{^break}}
      <tr><td>{{start}} - {{end}}</td><td>{{lesson}}</td><td>{{room}}</td><td>{{class}}</td></tr>
    {{/break}}
    {{#break}}
      <tr class="tr-break"><td>{{start}} - {{end}}</td><td>{{lesson}}</td><td>{{room}}</td><td>{{class}}</td></tr>
    {{/break}}
    {{#current}}
    <tr><td colspan="4">
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="{{percent}}" aria-valuemin="0" aria-valuemax="100" style="width: {{percent}}%">
        </div>
      </div>
    </td></tr>
    {{/current}}
  {{/lessons}}
</table>
