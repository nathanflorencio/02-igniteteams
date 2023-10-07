import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

import { AppError } from '@utils/AppError'
import { groupCreate } from '@storage/group/groupCreate'

import { Container, Content, Icon } from './styles'

import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'

export function NewGroup() {
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Nova Turma', 'Informe o nome da turma.')
      }

      await groupCreate(group)
      navigate('players', { group })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Turma", error.message)
      } else {
        Alert.alert("Nova Turma", 'Não foi possível criar uma nova turma.')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}