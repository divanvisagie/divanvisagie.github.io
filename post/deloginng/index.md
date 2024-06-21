<h1 class="title">De-logging</h1>
<h2 class="subtitle">Print log debugging can have tools too</h2>
<span class="date">2024-06-21</span>

It's a common trope in web development to say, "I just use console.log," especially for those who started development outside the domain of paid-for IDEs. Some people will tell you that you should be using a debugger all the time. It's a simple tool that you can attach to a process and pause mid-execution to see what's happening inside. And yes, it is a powerful tool—when it works...

There is, however, an argument against using a debugger, particularly in the context of live issues that are difficult to replicate in a local environment. This is often the case in desktop and game programming, but it also rings true in web development. Logs can be invaluable, especially in production environments where it's impossible to replicate full traffic load locally. Using the same logging tools in development as in production can give you consistent results and make solving issues much more straightforward.

## The Challenges of Symbol-Based Debugging

The other day, I had a problem where I thought simply attaching a debugger would help me gain insight into the state of a variable in memory. I hoped to capture what a JSON value looked like at that state. Sure, I could have logged it, but I wasn't writing logs to file locally, and dealing with cleaning embedded color codes seemed like a hassle. While there are existing tools for this, they don't allow for streaming logs either. So you sit there waiting for the buffer to fill before you see anything printed on the screen.

Using the debugger though turned into an exercise in futility. I ended up bikeshedding getting the debugger to work. Initially, I thought it was my Vim setup causing the issue, but after trying both VSCode and the native Node inspector with no success, it felt like the pain was not worth the convenience of pausing the program mid-execution.

One major issue with symbol-based debugging is that debug symbols can get out of line with the actual running code, particularly during development. There were times when I set a breakpoint on a specific line, only for the debugger to place it elsewhere entirely. This inconsistency made me realize that the pain was often not worth the supposed convenience. Not to mention, even for a simple language getting a working debug configuration can be a chore of pointing configurations at the correct files, and inTypeScript, that extends to customisations around the build platform you are using.

I concluded that simply logging the output would be a better approach.

## Who Needs Symbols When You Have Logs?

Screw it—I’ll make my own symbols with logs!

The main thing I want from a debugger is the ability to pause the program and inspect its state at that moment. While logs can certainly provide this, they are often long and cumbersome. Modern command-line tools also pollute the output with ANSI color codes, complicating the search through the logs. Despite these challenges, the goal remains the same: making logs useful and easily searchable.

## Logging Tools

To address some of these challenges, I built a range of tools that enhance the logging experience, making it more like using a debugger but with the added advantages of being lightweight and available in production.

### nocol

One of the first tools I developed is called **nocol**. Written in C, this command-line utility strips colors from streaming output, eliminating those pesky ANSI color codes. Unlike other tools like `ansi2txt`, nocol streams logs instantly. This avoids the long pauses typical of tools that buffer before writing to `tee` or other destinations. Perfect for real-time log processing, nocol is great for piping logs from services and program runners like Cargo or Yarn, which generate colored outputs. Having logs stripped of color in real-time is invaluable for easier searching within NeoVim or other text editors. You can find nocol here: [https://github.com/divanvisagie/nocol](https://github.com/divanvisagie/nocol).

### delog

Another tool I've built is **delog**. This tool executes a command and pauses whenever an output line contains the keyword "BREAK." This is particularly useful for creating manual breakpoints in your logs and allows for a debugger-like pause using mere console outputs. delog can be found here: [https://github.com/divanvisagie/delog](https://github.com/divanvisagie/delog).

### Enhancing NeoVim with Quickfix Lists

At this pont I was all in on making sure I don't go insan enext time I try to do something simple like look at a value. So it was time for text editor integraiton, so I can jump to the code that logged something. 

Vim and NeoVim have a feature called the quickfix list, a list of errors that you can quickly jump to in your code. This feature is immensely useful and simple, since it merely requires that the output from a tool follows a particular format. To leverage this, I created a custom configuration that appends any quickfix formated selected text to the quickfix list:

```lua
function GetVisualSelection()
  local start_pos = vim.fn.getpos("'<")
  local end_pos = vim.fn.getpos("'>")

  local start_line = start_pos[2]
  local start_col = start_pos[3]
  local end_line = end_pos[2]
  local end_col = end_pos[3]

  if start_line == end_line then
    return vim.fn.getline(start_line):sub(start_col, end_col)
  else
    local lines = vim.fn.getline(start_line, end_line)
    lines[1] = lines[1]:sub(start_col, -1)
    lines[#lines] = lines[#lines]:sub(1, end_col)
    return table.concat(lines, "\n")
  end
end

function AddSelectionToQuickfix()
  local line = GetVisualSelection()
  print(line)

  local filename = ''
  local line_num = 0
  local body = ''

  local parts = vim.fn.split(line, '[: ]')

  for part_idx, part in ipairs(parts) do
    if part_idx == 1 then
      filename = part
    end
    if part_idx == 2 then
      line_num = tonumber(part)
    end
    if part_idx > 2 then
        body = body .. part
    end
  end

  local qf_list = {}
  table.insert(qf_list, {
    filename = filename,
    lnum = line_num,
    col = 1,
    text = body
  })

  vim.fn.setqflist(qf_list, 'a')
  if vim.fn.empty(vim.fn.getqflist()) == 0 then
      vim.cmd('copen')
  end
end

vim.api.nvim_set_keymap('v', '<leader>qf', ":lua AddSelectionToQuickfix()<CR>", { noremap = true, silent = true })
```

### Injecting Console Logs for TypeScript

Now all I needed was to be able to select that text from the logs. So it was time for a good old `console.log` that simply followed the quickfix convention, but. I dont want to write whole lines, I want to be able to place breakpoints! So, time to set up a shortcut for printing logs.

So, in addition to appending logs to the quickfix list, I wrote a configuration for NeoVim that injects a `console.log` statement compatible with the quickfix list format for TypeScript files. Here’s how it works:

```lua
-- Create an autocommand group for TypeScript file bindings
vim.api.nvim_create_augroup('TypeScriptBindings', { clear = true })

function Insert_console_log()
  local line_num = vim.fn.line('.')
  local file_name = vim.fn.expand('%:p')
  file_name = vim.fn.fnamemodify(file_name, ':~:.')

  local log_statement = string.format("console.log('BREAK', '%s:%d', this || '');", file_name, line_num + 1)

  vim.api.nvim_buf_set_lines(0, line_num, line_num, false, { log_statement })
end

vim.api.nvim_create_autocmd('FileType', {
  group = 'TypeScriptBindings',
  pattern = 'typescript',
  callback = function()
    vim.api.nvim_buf_set_keymap(0, 'n', '<Leader>b', [[:lua Insert_console_log()<CR>]], { noremap = true, silent = true })
  end,
})
```

Now hiting space+b will insert a `console.log` statement at the current line in TypeScript files. This statement will be formatted to match the quickfix list format, allowing you to jump to the line in your code where the log was inserted.

## Conclusion

Turns out, debugging from print can be a lot more luxurious than you think. These simple tools allowed me to solve problems using logs in ways that provide a lot of the functionality you get from a debugger. The bonus is that you can replay logs even when the program isn’t running, as delog merely needs to play through the log, allowing you to simulate breakpoints. It’s all about making logs as powerful and easy to use as possible—without all the hassles of traditional debugging tools.

## Final Thought

There is something to be said for the personal development environment. With the right tools, like nocol and delog, and some clever configuration of your text editor, I was able to acheive a lot of the functionality I was looking for with a lot less pain, at least, in my opinion. You may be different, your working style might be different, but if you are a Software Engineer, and your environment doesnt suit you, remember that your environment is software, and that you can change it.
