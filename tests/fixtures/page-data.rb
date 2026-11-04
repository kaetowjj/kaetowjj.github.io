require 'yaml'
require 'json'
puts JSON.generate(ARGV.to_h { |name| [name, YAML.safe_load(File.read(File.join('_data', name + '.yml')))] })
