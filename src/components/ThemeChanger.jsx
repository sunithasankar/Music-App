export default function ThemeChanger({theme,setTheme}) {
  return (
    <i
    className={`fa fa-toggle-${theme==='light'?'on':'off'}`}
    onClick={()=>setTheme(theme==="light"?"dark":"light")}
    />
  )
}
