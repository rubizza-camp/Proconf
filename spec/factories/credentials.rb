FactoryBot.define do
  factory :credential do
    user
    service { 'telegram' }
  end
end
