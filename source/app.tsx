import React, { useState } from 'react';
import {Box, Text, useInput} from 'ink';

export default function App() {

    const branches = [
        'main',
        'feature_branch_1',
        'feature_branch_2',
        'feature_branch_3',
        'feature_branch_4',
        'realease0.1',
        'realease0.2',
        'realease0.3',
        'realease0.4'
    ]

    const [mode, setMode] = useState('')
    const [command, setCommand] = useState('$ ')

    useInput((input, key) => {
        if (mode === 'cmd')
            if(key.return) {
                setCommand('$ ')
                setMode('')
            } else
            if (key.delete) {
                setCommand(command.substring(0, Math.max(command.length - 1, 2)))
            } else setCommand(command + input)
        else {
            if(input === 'q') {
                setMode('quit')
            }
            if(input === '/') {
                setMode('cmd')
            }
        }
    })

    const BranchesView = (props: {branches: string[]}) => {
        return (
            <Box borderStyle={'single'} flexDirection='column'>
                {props.branches.map((e, i) => {
                    return <Text bold={i === 0} key={i}>{i === 0 ? '*' : ' '} {e}</Text>
                })}
            </Box>
        )
    }

	return (
		<Box borderStyle={'single'} borderColor={'gray'} flexDirection='column'>
            <Box>
                <Box borderStyle={'double'}>
                    <Text bold color={'green'}>V503.71</Text>
                </Box>
                <Box borderStyle={'single'}>
                    <Text>V504.72</Text>
                </Box>
                <Box borderStyle={'single'}>
                    <Text>V505.73</Text>
                </Box>
            </Box>
            <Box borderStyle={'single'}>
                <BranchesView branches={branches}></BranchesView>
            </Box>
            {mode === 'cmd' && 
                <Box borderStyle={'classic'}>
                    <Text>{command}</Text>
                </Box>
            }
            <Box borderStyle={'double'} paddingX={1} gap={2}>
                <Text>q - Quit</Text>
                <Text>/ - Command</Text>
                <Text>b - Branch</Text>
                <Text>s - Stage</Text>
                <Text>c - Commit</Text>
            </Box>
	    </Box>
	);
}
