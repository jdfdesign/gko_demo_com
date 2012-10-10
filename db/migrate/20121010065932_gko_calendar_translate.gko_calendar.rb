# This migration comes from gko_calendar (originally 20110416095620)
class GkoCalendarTranslate < ActiveRecord::Migration
  def self.up
    unless table_exists?(:event_translations)
      Event.create_translation_table! :title => :string, :slug => :string, :body => :text
    end
  end

  def self.down
    Event.drop_translation_table if table_exists?(:event_translations)
  end
end