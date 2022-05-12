import { getDefaultNormalizer } from "@testing-library/react";
import { Table,Button } from 'reactstrap';
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";


function Tabela(){
    const [usuarios, setUsuarios] = useState([]) 
    //esta hook retorna uma variavel e uma funcao 
    //o useState defini o estado inicial como vazio
    
    const [id,setId] = useState("");
    const [nome,setNome] = useState("");
    const [email,setEmail] = useState("");
    const [senha,setSenha] = useState("");

    function salvarFormulario(){
        

        let parametros = {
            name: nome,
            email: email,
            password: senha
        }
        axios.post('https://iot.14mob.com/api-fiap/public/index.php/users', parametros).then(response => {
            if(response.status == 201){
                alert('Ebaaaaa deu certo')
            }else{
                alert('lascou')
            }
        }).catch( error => console.log(error));

    }

    function removerUsuario(id){
        console.log('funcionando' + id);

        axios.delete("https://iot.14mob.com/api-fiap/public/index.php/users/" + id).then( response => {
            alert('Deu certo removi o usuario')

            window.location = "";
            
        }).catch( error => console.log(error));

    }
    
    function atualizarUsuarioApi(){

        let parametros = {
            name: nome,
            email: email,
            password: senha
        }
        axios.put('https://iot.14mob.com/api-fiap/public/index.php/users/'+ id, parametros).then(response => {
            if(response.status == 200){
                alert('Ebaaaaa deu certo')
            }else{
                alert('lascou')
            }
        }).catch( error => console.log(error));
    }

    function atualizarUsuario(usuario){
        setId(usuario.id);
        setNome(usuario.name);
        setEmail(usuario.email);
        setSenha(usuario.password);
    }
    

    useEffect(() =>{
      axios.get('https://iot.14mob.com/api-fiap/public/index.php/users').then(response =>{
        setUsuarios(response.data.users);
      }).catch(error => console.log(error));
    }, [])
    //toda vez que pagina for carregada o hook useEffect chama a consulta
    //que ao terminar de consultar ira atribuir a lista de usuarios utilizando o metodo setUsuario
    
    return (
        <div>

            <form className="formulario" onSubmit={event => {
                event.preventDefault();
                if(id != ''){
                    atualizarUsuarioApi()
                }else{
                    salvarFormulario();
                }
                return false;
            } } >
                <label>Nome</label>
                <input name="name"  onChange={ e => setNome(e.target.value) } />
                <label>Email</label>
                <input name="email" onChange={ e => setEmail(e.target.value) } />
                <label>senha</label>
                <input name="password" onChange={ e => setSenha(e.target.value) } />

                <Button type='submit'>Enviar</Button>   
            </form>

            <p>{ nome }</p>
            <p>{ email }</p>
            <p>{ senha }</p>

            <Table className='table-dark' striped bordered hover>
                <thead >
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data de criação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                { usuarios.map(usuario =>{ 
                    //.map percorre o array de objetos ate o fim como um loop
                    // a arrow function e usada para retornar o html usando javascript dentro do html
                    // usuario.name pega objeto name   no lista_de_usuarios usuario é a referencia
                    return <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.created_at}</td>
                            <td>
                                <Button onClick={ event => removerUsuario(usuario.id) } > Deletar </Button>
                                <Button onClick={ event => atualizarUsuario(usuario)} > Editar </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>  
    );
}

export default Tabela;
