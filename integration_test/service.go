package integrationtest

import (
	"fmt"
	"os/exec"
)

func restart_mavseal() {
	_, err := exec.Command("docker", "compose", "-f", "./docker-compose.yml", "--env-file", ".env.current", "--project-directory", ".", "stop", "mavseal").CombinedOutput()
	if err != nil {
		panic("failed to stop mavseal")
	}
	out, err := exec.Command("docker", "compose", "-f", "./docker-compose.yml", "--env-file", ".env.current", "--project-directory", ".", "up", "-d", "--wait", "--wait-timeout", "60", "mavseal").CombinedOutput()
	if err != nil {
		fmt.Println("restart mavseal: failed to start: " + string(out))
		panic("failed to start mavseal during restart")
	}
}

func kill_baking_processes() {
	exec.Command("docker", "exec", "mavkit", "pkill", "-9", "-f", "mavkit-client").CombinedOutput()
}

func backup_then_update_config(c Config) {
	_, err := exec.Command("cp", "mavseal.yaml", "mavseal.original.yaml").CombinedOutput()
	if err != nil {
		panic("failed to backup config")
	}
	err = c.Write()
	if err != nil {
		panic("failed to write new config")
	}
}

func restore_config() {
	_, err := exec.Command("mv", "mavseal.original.yaml", "mavseal.yaml").CombinedOutput()
	if err != nil {
		panic("failed to restore original config")
	}
	restart_mavseal()
}

func restart_stack() {
	_, err := exec.Command("docker", "compose", "-f", "./docker-compose.yml", "--env-file", ".env.current", "--project-directory", ".", "kill").CombinedOutput()
	if err != nil {
		panic("failed to kill stack")
	}
	_, err = exec.Command("docker", "compose", "-f", "./docker-compose.yml", "--env-file", ".env.current", "--project-directory", ".", "up", "-d", "--wait", "--wait-timeout", "60").CombinedOutput()
	if err != nil {
		panic("failed to up stack")
	}
}
