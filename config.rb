activate :sprockets
activate :livereload

set :css_dir, "assets/css"
set :js_dir, "assets/js"
set :images_dir, "assets/images"

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :blog do |b|
  b.sources = "index/{year}-{month}-{day}-{title}.html"
  b.default_extension = ".md"
  b.taglink = "index/{tag}.html"
  # b.tag_template = "item.html"
  b.permalink = "{title}"
  b.name = @app.data.site.title
  b.layout = "item"
end

activate :search do |search|

  search.resources = ['index/']

  search.fields = {
    title:   {boost: 100, store: true, required: true},
    content: {boost: 50},
    url:     {index: false, store: true},
    tags:    {boost: 40, store: true},
    image:   {store: true}
  }
end


activate :directory_indexes
