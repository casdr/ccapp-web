<select id="week" class="form-control">
    {{#.}}
    <option {{^status}}disabled="disabled" {{/status}}{{#current}}selected="selected" {{/current}}value="{{week}}">{{week}}</option>
    {{/.}}
</select>