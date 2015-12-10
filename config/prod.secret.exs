use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :gametemplate, Gametemplate.Endpoint,
  secret_key_base: "BR/iyWypnf1ccYZwGSRj+Ct40aG1U8yKPEbQf5KaT2fo1+kChMzoTaD0RZoRMY/l"

# Configure your database
config :gametemplate, Gametemplate.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "gametemplate_prod",
  pool_size: 20
