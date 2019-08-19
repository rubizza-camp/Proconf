FactoryBot.define do
  factory :timecode do
    title { 'test title' }
    time { Time.now.utc }
  end
end
