# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    if user&.role&.name == 'admin'
      can :manage, Episode
    else
      can :read, Episode
    end
  end
end
