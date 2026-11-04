# Build-time canonical keys are the source of truth for every technical Tag.
module TechTags
  def tech_tag_keys(tags)
    Array(tags).filter_map do |tag|
      next unless tag.is_a?(String)
      key = tag.unicode_normalize(:nfkc).gsub(/\A[\p{Space}\uFEFF]+|[\p{Space}\uFEFF]+\z/u, '').downcase(:fold)
      key unless key.empty?
    end.uniq.sort
  end
end
Liquid::Template.register_filter(TechTags) if defined?(Liquid::Template)
