function menu(zona){
    document.getElementById('id-inicio').style.display='none';
    document.getElementById('id-proyectos').style.display='none';
    document.getElementById('id-conocimientos').style.display='none';
    document.getElementById('id-contacto').style.display='none';
    document.getElementById('id-acercaDeMi').style.display='none';
    document.getElementById(zona).style.display='flex';
}