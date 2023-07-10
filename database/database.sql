-- Criação da tabela tasks
CREATE TABLE tasks (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT 0
);

-- Inserção de exemplos de dados iniciais
INSERT INTO tasks (task, is_completed) VALUES
  ('Tarefa 1', 0),
  ('Tarefa 2', 1),
  ('Tarefa 3', 0);