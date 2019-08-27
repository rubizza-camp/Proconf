FactoryBot.define do
  factory :episode do
    title { 'test title' }
    date { Time.now.utc }
    video { 'vpiQXXBma10' }
  end
end
