Feature: The Lando plugin on a project row
  Once the plugin is activated and installed, every project folder that carries a .lando.yml carries
  the LANDO menu, and the Plugins page lists the plugin with its four steps.

  Scenario: The plugin is listed on the Plugins page
    Given I am on "/settings/plugins"
     Then I should see "Lando"
      And I should see "@webship/workspace-lando"
