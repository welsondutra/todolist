<?php
$host = getenv('DB_HOST');
$username = getenv('DB_USER');
$password = getenv('DB_PASSWORD');
$database = getenv('DB_NAME');

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
  die('Erro na conexão com o banco de dados: ' . $connection->connect_error);
}

$action = isset($_POST['action']) ? $_POST['action'] : '';


if ($action === 'create') {
  $task = $_POST['task'];
  $sql = "INSERT INTO tasks (task) VALUES ('$task')";

  if ($connection->query($sql) === TRUE) {
    echo 'Tarefa criada com sucesso.';
  } else {
    echo 'Erro ao criar tarefa: ' . $connection->error;
  }
} else if ($action === 'delete') {
  $id = $_POST['id'];

  $sql = "DELETE FROM tasks WHERE id=$id";
  $result = $connection->query($sql);

  if ($result === TRUE) {
    echo 'Tarefa excluída com sucesso.';
  } else {
    echo 'Erro ao excluir tarefa: ' . $connection->error;
  }
} else if ($action === 'update') {
  $id = $_POST['id'];
  $task = $_POST['task'];
  $is_completed = $_POST['is_completed'];
  $sql = "UPDATE tasks SET task='$task', is_completed='$is_completed' WHERE id=$id";
  $result = $connection->query($sql);

  echo ($result);

  if ($result === TRUE) {
    echo 'Tarefa atualizada com sucesso.';
  } else {
    echo 'Erro ao atualizar tarefa: ' . $connection->error;
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sql = "SELECT * FROM tasks";
  $result = $connection->query($sql);

  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      echo '
            <div class="todo ' . ($row['is_completed'] ? 'done' : 'pending') . '">
                <input type="checkbox" ' . ($row['is_completed'] ? 'checked' : null) . ' class="done-checkbox" id="' . $row['id'] . '">
                <h4>' . $row['task'] . '</h4>
                <button class="edit-todo"><i class="fa-solid fa-pen"></i></button>
            </div>';
    }
  } else {
    echo '<hr><h3 style="align-self: center">Nenhuma tarefa foi adicionada.</h3>';
  }
}

$connection->close();
?>