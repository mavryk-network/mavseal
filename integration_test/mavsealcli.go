package integrationtest

import (
	"os/exec"
)

func MavSealCli(arg ...string) ([]byte, error) {
	var cmd = "docker"
	var args = []string{"exec", "mavseal", "mavseal-cli"}
	args = append(args, arg...)
	return exec.Command(cmd, args...).CombinedOutput()
}
