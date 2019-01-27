activate :livereload

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

set :js_dir, 'assets/js'
set :css_dir, 'assets/css'
set :images_dir, 'assets/images'

set :sass_source_maps, true

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

activate :blog do |b|
  b.sources = "terms/{year}-{month}-{day}-{title}.html"
  b.default_extension = ".md"
  b.taglink = "terms/{tag}.html"
  b.tag_template = "/term.html"
  b.permalink = "definition/{title}"
  b.layout = "definition"
end

activate :search do |search|

  search.resources = ['terms/']

  search.fields = {
    title:   {boost: 100, store: true, required: true},
    content: {boost: 50},
    url:     {index: false, store: true},
    tags:    {boost: 40, store: true},
    image:   {store: true}
  }
end

helpers do
  def rhizomeEdgesArray
    arr = []
    count = 0
    loop do
      a, b = [*0..blog.articles.length].sample(2)
      next if a.eql? (b) or arr.include?([a, b])
      arr << [a, b]
      count += 1
      break if count.eql?(blog.articles.length)
    end

    return arr
  end
end

activate :sprockets
activate :directory_indexes