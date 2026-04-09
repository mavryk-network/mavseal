package commands

import (
	"fmt"
	"runtime/debug"

	"github.com/mavryk-network/mavseal/pkg/metrics"
	"github.com/spf13/cobra"
)

func NewVersionCommand(c *Context) *cobra.Command {
	listCmd := &cobra.Command{
		Use:     "version",
		Aliases: []string{"v"},
		Short:   "Show mavseal image version/release (short alias 'v') ",
		RunE: func(cmd *cobra.Command, args []string) error {
			var vout string
			switch {
			case metrics.GitRevision != metrics.GitBranch:
				vout = "GitRevision: " + metrics.GitRevision + "\n" + "GitBranch: " + metrics.GitBranch
			case metrics.GitRevision != "":
				vout = "Release Version: " + metrics.GitRevision
			default:
				path := "mavseal"
				if bi, ok := debug.ReadBuildInfo(); ok {
					path = bi.Main.Path
				}
				vout = "Release Version: " + path
			}
			fmt.Println(vout)
			return nil
		},
	}

	return listCmd
}
